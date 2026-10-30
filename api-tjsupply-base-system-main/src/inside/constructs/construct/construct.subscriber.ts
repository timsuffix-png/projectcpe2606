import { DataSource, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm";
import { Construct } from "./entities/construct.entity";
import { HttpException, HttpStatus, Logger } from "@nestjs/common";
import { FormulaItem } from "../../formula/formula-item/entities/formula-item.entity";
import { Item } from "../../items/item/entities/item.entity";
import { ProductionSub } from "../../plan/production-sub/entities/production-sub.entity";

@EventSubscriber()
export class ConstructSubscriber implements EntitySubscriberInterface<Construct> {
  private logger = new Logger()

  constructor(private dataSource: DataSource){
    dataSource.subscribers.push(this)
  }

  listenTo(): Function | string {
    return Construct
  }

  async beforeUpdate(event: UpdateEvent<Construct>): Promise<any> {
    try{
      await this.dataSource.transaction(async (transactionEntityManager) => {
        // console.log(event.entity)

        // Construct {
        //   ID: '99202408200351000101',
        //   encryptIDValue: 'U2FsdGVkX18o1RutQCvVMIjFOZdoZmuFDKijIJx6jVkqpPIq+TKjyQqCPSkzdxgN',
        //   createdAt: '2024-08-20T01:27:50',
        //   updatedAt: '2024-08-20T01:27:50',
        //   status: 'finish',
        //   producedBy: 'ac6a1ca4-85b2-486c-9e20-4f91609eccfa'
        // }

        if (Object.keys(event.entity).length === 1 && Object.keys(event.entity)[0] === "status") return

        const construct = await transactionEntityManager.getRepository(Construct).createQueryBuilder("con")
        .innerJoinAndSelect("con.productionSub", "sub")
        .innerJoinAndSelect("sub.formulaProject", "formula")
        .leftJoinAndSelect("con.producedBy", "producedBy")
        .where("con.ID = :id", {id: event.entity.ID})
        .getOne()
        // console.log(construct)
        /*
        Construct {
          ID: '99202407200001000401',
          createdAt: '2024-07-20T21:33:53',
          updatedAt: '2024-07-20T21:33:53',
          status: 'waiting',
          productionSub: ProductionSub {
            ID: '6e968b72-f1b5-41ce-94a1-34c30623e8df',
            amountRequire: 30,
            amountCurrent: 0,
            formulaProject: FormulaProject {
              ID: 'f0ba91ab-2aab-4bbe-a39f-b24a0a6a5b08',
              name: 'formula to create robot',
              costFormula: 15,
              detail: 'some detail'
            }
          },
          producedBy: null
        }
        */

        if (construct.producedBy !== null) throw new Error("these item already has produce user.")

        const formulaProjectID = construct.productionSub["formulaProject"]["ID"]
        
        const formulaItem = await transactionEntityManager.getRepository(FormulaItem).createQueryBuilder("formulaItem")
        .innerJoinAndSelect("formulaItem.formulaProject", "formulaProject")
        .innerJoinAndSelect("formulaProject.toItem", "toItem")
        .innerJoinAndSelect("formulaItem.item", "item")
        .where("formulaProject.ID = :id", {id: formulaProjectID})
        .getMany()

        // console.log(formulaItem)
        /*
        [
          FormulaItem {
            ID: '01bc6a23-e896-433d-b518-679277059f55',
            amount: 3,
            formula: FormulaProject {
              ID: 'f0ba91ab-2aab-4bbe-a39f-b24a0a6a5b08',
              name: 'formula to create robot',
              costFormula: 15,
              detail: 'some detail',
              toItem: [Item]
            },
            item: Item {
              ID: '7df4f434-39c0-41a9-bc44-a2a5d724b37e',
              itemType: 'material',
              isFavourite: false,
              amount: 994,
              costPrice: 20.5,
              salePrice: 35,
              insurancePeriod: 12,
              name: 'arduino',
              detail: 'arduino high grade',
              createdAt: '2024-07-20T21:31:39'
            }
          },
          FormulaItem {
            ID: 'a878cf9a-d304-4a07-bbf1-4b9d85a149d2',
            amount: 3,
            formula: FormulaProject {
              ID: 'f0ba91ab-2aab-4bbe-a39f-b24a0a6a5b08',
              name: 'formula to create robot',
              costFormula: 15,
              detail: 'some detail',
              toItem: [Item]
            },
            item: Item {
              ID: 'adaa1d38-b3ed-4dda-8d27-805e2b57529e',
              itemType: 'material',
              isFavourite: false,
              amount: 994,
              costPrice: 20.5,
              salePrice: 35,
              insurancePeriod: 12,
              name: 'raspberrypi',
              detail: 'raspberrypi high grade',
              createdAt: '2024-07-20T21:31:29'
            }
          }
        ]
        */
        // this will consume material to build product

        // for (let data of formulaItem){
        //   if (data.amount > data.item.amount) throw new Error("Items in storage not enough!!")
        // }
        // for (let data of formulaItem){
        //   await transactionEntityManager.getRepository(Item).createQueryBuilder()
        //   .update(Item)
        //   .set({amount: data.item.amount - data.amount})
        //   .where("ID = :id", {id: data.item.ID})
        //   .execute()
        // }

        await transactionEntityManager.getRepository(ProductionSub).createQueryBuilder()
        .update(ProductionSub)
        // set ID to send ID to trigger
        .set({ID: construct.productionSub["ID"], amountCurrent: construct.productionSub["amountCurrent"] + 1})
        .where("ID = :id", {id: construct.productionSub["ID"]})
        .execute()

        const toItemID = formulaItem[0].formulaProject.toItem["ID"]
        const amount = formulaItem[0].formulaProject.toItem["amount"]
        await transactionEntityManager.getRepository(Item).createQueryBuilder()
        .update(Item)
        .set({amount: amount+1})
        .where("ID = :id", {id: toItemID})
        .execute()
      })
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}