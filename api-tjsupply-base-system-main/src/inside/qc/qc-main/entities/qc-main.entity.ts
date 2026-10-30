import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, ManyToOne } from "typeorm"
import { QcItemProject } from "../../qc-item-project/entities/qc-item-project.entity"
import { QcRecordStatus } from "../../qc-record-status/entities/qc-record-status.entity"
import { QcScript } from "../../qc-script/entities/qc-script.entity"
import { QcType } from "../../qc-type/entities/qc-type.entity"

@Entity()
export class QcMain {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {unique: true, length: 100, nullable: false})
  testName: string

  @Column("varchar", {length: 200, nullable: true})
  detail: string

  @ManyToOne(type=>QcType, qcType=>qcType.qcMain, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcType: QcType

  @OneToOne(type=>QcScript, qcScript=>qcScript.qcMain, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcScript: QcScript

  @OneToMany(type=>QcItemProject, qcItemProject=>qcItemProject.qcMain, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcItemProject: QcItemProject[]

  @OneToMany(type=>QcRecordStatus, qcRecordStatus=>qcRecordStatus.qcMain, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcRecordStatus: QcRecordStatus[]
}
