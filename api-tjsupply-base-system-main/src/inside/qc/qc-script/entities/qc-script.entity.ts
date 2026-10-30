import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm"
import { QcMain } from "../../qc-main/entities/qc-main.entity"

@Entity()
export class QcScript {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("json", {nullable: false})
  script: JSON

  @OneToOne(type=>QcMain, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  @JoinColumn()
  qcMain: QcMain
}
