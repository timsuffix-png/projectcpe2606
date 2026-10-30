import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "../../item/entities/item.entity";

@Entity()
export class ItemType {
  @PrimaryGeneratedColumn("increment")
  ID: string

  @Column("varchar", {unique: true, length: 50, nullable: false})
  name: string

  @OneToMany(type=>Item, item=>item.ID, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  item: Item[]
}
