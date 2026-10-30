import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm"
import { QcMain } from "../../qc-main/entities/qc-main.entity"
import { QcRecord } from "../../qc-record/entities/qc-record.entity"
import * as moment from "moment-timezone"

@Entity()
export class QcRecordStatus {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {length: 200, nullable: true})
  result: string

  @Column("varchar", {length: 20, nullable: false})
  status: string

  @Column("varchar", {length: 200, nullable: false})
  detail: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @ManyToOne(type=>QcRecord, qcRecord=>qcRecord.qcRecordStatus, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcRecord: QcRecord

  @ManyToOne(type=>QcMain, qcMain=>qcMain.qcRecordStatus, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcMain: QcMain
}
