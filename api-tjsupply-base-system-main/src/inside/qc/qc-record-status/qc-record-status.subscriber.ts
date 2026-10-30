import { DataSource, EntitySubscriberInterface, EventSubscriber, InsertEvent, Repository } from "typeorm";
import { QcRecordStatus } from "./entities/qc-record-status.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { QcRecord } from "../qc-record/entities/qc-record.entity";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";

@EventSubscriber()
export class QcRecordStatusSubscriber implements EntitySubscriberInterface<QcRecordStatus>{
  private logger = new Logger()
  
  constructor (
    private dataSource: DataSource
  ) {
    dataSource.subscribers.push(this)
  }

  listenTo(): Function | string {
    return QcRecordStatus
  }

  async afterInsert(event: InsertEvent<QcRecordStatus>): Promise<any> {
    try{
      // console.log(event.entity)
      // {
      //   qcRecord: '4c5a6fb2-45a6-4314-869d-c0593ee0cdf5',
      //   qcMain: '12c656fb-1fa8-4d87-ae72-54eea8806f35',
      //   result: 'Passed',
      //   status: 'status all ok',
      //   detail: '8.4S, 249, 500.000000',
      //   ID: 'ea4ec0d4-e46f-4a16-8db5-f65a02a63fd6'
      // }
      await this.dataSource.transaction(async (transactionEntityManager) => {
        const qcRecord = await transactionEntityManager.getRepository(QcRecord).createQueryBuilder("record")
        .select(["record.ID", "project.ID", "itemProject.ID", "main.ID", "status.ID", "status.status", "mainStatus.ID"])
        .innerJoin("record.qcProject", "project")
        .innerJoin("project.qcItemProject", "itemProject")
        .innerJoin("itemProject.qcMain", "main")
        .innerJoin("record.qcRecordStatus", "status")
        .innerJoin("status.qcMain", "mainStatus")
        .where("record.ID = :qcRecordID", {qcRecordID: event.entity.qcRecord})
        .getOne()
        // console.log(qcRecord)
        // QcRecord {
        //   ID: '4c5a6fb2-45a6-4314-869d-c0593ee0cdf5',
        //   qcProject: QcProject {
        //     ID: 'c3f97571-a598-4812-ae69-b87d65874955',
        //     qcItemProject: [
        //       [QcItemProject],
        //       [QcItemProject],
        //       [QcItemProject],
        //       [QcItemProject]
        //     ]
        //   },
        //   qcRecordStatus: [
        //     QcRecordStatus {
        //       ID: 'a72a9559-0602-4bbf-be22-e577c677f336',
        //       status: 'Failed',
        //       qcMain: [QcMain]
        //     },
        //     QcRecordStatus {
        //       ID: '21dcc9d7-a4a4-4acc-bf56-4a0090279062',
        //       status: 'Passed',
        //       qcMain: [QcMain]
        //     }
        //   ]
        // }
        // [
        //   QcItemProject { ID: 'd4d5a141-20cb-44c9-adb3-841a943e4f4d' },
        //   QcItemProject { ID: '5aca6d22-9da5-45cd-9e83-c04da2f1b989' },
        //   QcItemProject { ID: 'f385f2ae-a5ab-480d-a67f-4d7c4f07eda2' },
        //   QcItemProject { ID: '2815ea62-0ccc-4d42-9c8a-f9286734e4ec' }
        // ]

        // base qcMainID from qcProject
        const qcMainInProject = qcRecord.qcProject["qcItemProject"].map((data: any)=>({qcMain: data.qcMain.ID}))
        // child qcMainID from qc result
        const qcMainInStatus = Array.from(qcRecord.qcRecordStatus).map((data: any)=>({qcMain: data.qcMain.ID, status: data.status}))

        var passCount = 0
        var failCount = 0
        const condition = qcMainInProject.length
        for (let IDinProject of qcMainInProject){
          for (let IDInStatus of qcMainInStatus){
            if(IDinProject.qcMain !== IDInStatus.qcMain) continue
            else {
              if (IDInStatus.status === "Failed"){
                failCount++
                break
              }
              else if (IDInStatus.status === "Passed") {
                passCount++
                break
              }
            }
          }
        }
        if (passCount === condition){
          await transactionEntityManager.getRepository(QcRecord).createQueryBuilder()
          .update(QcRecord)
          .set({statusOverView: "Passed"})
          .where("ID = :qcRecordID", {qcRecordID: qcRecord.ID})
          .execute()
        }
        else if (passCount+failCount === condition){
          await transactionEntityManager.getRepository(QcRecord).createQueryBuilder()
          .update(QcRecord)
          .set({statusOverView: "Failed"})
          .where("ID = :qcRecordID", {qcRecordID: qcRecord.ID})
          .execute()
        }
      })
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}