import * as moment from "moment-timezone"
import { Construct } from "src/inside/constructs/construct/entities/construct.entity"
import { UsersProducer } from "src/inside/user/entities/usersProducer.entity"
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, Column, ManyToOne, OneToMany, UpdateDateColumn } from "typeorm"
import { QcProject } from "../../qc-project/entities/qc-project.entity"
import { QcRecordStatus } from "../../qc-record-status/entities/qc-record-status.entity"

@Entity()
export class QcRecord {
  @PrimaryGeneratedColumn("uuid")
  ID: string

  @CreateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: false})
  createdAt: string

  @UpdateDateColumn({type: "timestamp", transformer: {to: (time: string)=>time, from: (time: string)=>moment(time).tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ss")}, nullable: true})
  updatedAt: string

  @Column("varchar", {length: 20, nullable: false, default: "In progress"})
  statusOverView: string

  @ManyToOne(type=>Construct, construct=>construct.qcRecord, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  construct: Construct

  @ManyToOne(type=>QcProject, qcProject=>qcProject.qcRecord, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcProject: QcProject

  @ManyToOne(type=>UsersProducer, usersProducer=>usersProducer.testBy, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  testBy: UsersProducer

  @OneToMany(type=>QcRecordStatus, qcRecordStatus=>qcRecordStatus.qcRecord, {nullable: false, onDelete: "CASCADE", onUpdate: "RESTRICT"})
  qcRecordStatus: QcRecordStatus[]
}
