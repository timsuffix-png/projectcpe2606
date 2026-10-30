import { Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm"
import { QcMain } from "../../qc-main/entities/qc-main.entity"
import { QcProject } from "../../qc-project/entities/qc-project.entity"

@Entity()
export class QcItemProject {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @ManyToOne(type=>QcMain, qcMain=>qcMain.qcItemProject, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcMain: QcMain

  @ManyToOne(type=>QcProject, qcProject=>qcProject.qcItemProject, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcProject: QcProject
}
