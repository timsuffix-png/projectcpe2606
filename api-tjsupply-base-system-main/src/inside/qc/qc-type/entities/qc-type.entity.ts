import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QcMain } from "../../qc-main/entities/qc-main.entity";

@Entity()
export class QcType {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {unique: true, length: 20, nullable: false})
  name: string

  @OneToMany(type=>QcMain, qcMain=>qcMain.qcType, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcMain: QcMain
}
