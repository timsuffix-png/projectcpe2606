import { Item } from "src/inside/items/item/entities/item.entity"
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class ItemModel {
  @PrimaryGeneratedColumn("increment")
  ID: number

  @OneToOne(type=>Item, item=>item.itemModel, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  @JoinColumn()
  item: Item
}
