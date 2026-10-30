import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { QcItemProject } from "../../qc-item-project/entities/qc-item-project.entity"
import { QcRecord } from "../../qc-record/entities/qc-record.entity"

@Entity()
export class QcProject {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @Column("varchar", {length: 100, nullable: false})
  projectName: string

  @Column("varchar", {length: 200, nullable: true})
  detail: string

  @OneToMany(type=>QcItemProject, qcItemProject=>qcItemProject.qcProject, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcItemProject: QcItemProject[]
  
  @OneToMany(type=>QcRecord, qcRecord=>qcRecord.qcProject, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcRecord: QcRecord[]
}
