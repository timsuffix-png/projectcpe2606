import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Construct } from "src/inside/constructs/construct/entities/construct.entity";
import { OrderNumber } from "../../order-number/entities/order-number.entity";
import { PicknpayGoods } from "../../picknpay-goods/entities/picknpay-goods.entity";
import * as moment from "moment-timezone";
import { FormulaProject } from "src/inside/formula/formula-project/entities/formula-project.entity";
import { FormulaItem } from "src/inside/formula/formula-item/entities/formula-item.entity";
import { ItemModel } from "src/inside/etc/item-model/entities/item-model.entity";
import { ItemType } from "../../item-type/entities/item-type.entity";

@Entity()
export class Item {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("boolean", {nullable: false, default: false})
  isFavourite: boolean

  @Column("int", {nullable: true, default: 0})
  amount: number

  @Column("numeric", {transformer: {to: (value: number)=>value, from: (value: string)=>parseFloat(value)}, nullable: false})
  costPrice: number

  @Column("int", {nullable: false})
  salePrice: number

  @Column("smallint", {nullable: false, default: 12})
  insurancePeriod: number

  @Column("varchar", {unique: true, length: 50, nullable: false})
  name: string

  @Column("varchar", {length: 200, nullable: false})
  detail: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @UpdateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: true})
  updatedAt: string

  @Column("varchar", {length: 200, nullable: true})
  path2picture: string

  @ManyToOne(type=>ItemType, itemType=>itemType.item, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  itemType: ItemType

  @OneToMany(type=>OrderNumber, orderNumber=>orderNumber.item, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  orderNumber: OrderNumber[]

  @OneToMany(type=>PicknpayGoods, picknpayGoods=>picknpayGoods.item, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  picknpayGoods: PicknpayGoods[]

  @OneToMany(type=>FormulaProject, formulaProject=>formulaProject.toItem, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  formulaProject: FormulaProject[]

  @OneToMany(type=>FormulaItem, formulaItem=>formulaItem.item, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  formulaItem: FormulaItem[]

  @OneToMany(type=>Construct, construct=>construct.item, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  construct: Construct[]

  @OneToOne(type=>ItemModel, itemModel=>itemModel.item, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  itemModel: ItemModel
}
