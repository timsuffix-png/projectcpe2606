import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Counter {
  @PrimaryGeneratedColumn("increment")
  ID: number

  @Column("smallint")
  itemCountPerDay: number
}
