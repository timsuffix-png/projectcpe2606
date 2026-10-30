import { HttpException, HttpStatus, Injectable, Logger, StreamableFile } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Like, Repository } from 'typeorm';
import { UsersProducer } from './entities/usersProducer.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserPasswordDto } from './dto/update-user-password.dto';
import { UserAction } from '../etc/user-action/entities/user-action.entity';
import * as crypto from "crypto"
import { createReadStream, promises } from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  private logger = new Logger()
  
  constructor(
    @InjectRepository(UsersProducer) private userRepository: Repository<UsersProducer>,
    @InjectRepository(UserAction) private userActionRepository: Repository<UserAction>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<Object> {
    try{
      const password = createUserDto.password
      createUserDto.password = crypto.pbkdf2Sync(password, process.env.SECRET_KEY || "Please specify SECRET_KEY in .env file (this will be use by default).", 1000, 100, "sha512")
      .toString("hex")
      const user = await this.userRepository.createQueryBuilder().insert().into(UsersProducer).values(createUserDto).execute()
      return {error: false, message: "register user complete.", data: user.identifiers}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAll(limit: number, page: number, approve: boolean): Promise<Object> {
    try{
      const [users, count] = await this.userRepository.createQueryBuilder("user")
      .select(["user.ID", "user.username", "user.role", "user.email", "user.name", "user.surname"])
      .where("user.approve = :approve", {approve})
      .orderBy("user.createdAt", "ASC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {error: false, message: "get list of users complete.", data: users, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findOne(id: string): Promise<Object> {
    try{
      const user = await this.userRepository.createQueryBuilder("user")
      .select(["user.ID", "user.username", "user.name", "user.surname", "user.role", "user.email", "user.gender", "user.phone", "user.address", "user.birthday", 
        "user.dateEmployment"])
      .where("user.ID = :id", {id})
      .getOne()

      if (!user) throw new Error(`User with ID#${id} not found.`)
      return {error: false, message: "get user data complete.", data: user}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<Object> {
    try{
      const user = await this.userRepository.createQueryBuilder()
      .update(UsersProducer)
      .set(updateUserDto)
      .where("ID = :id", {id})
      .execute()

      return {error: false, message: "update profile complete."}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updatePassword(id: string, updateUserPasswordDto: UpdateUserPasswordDto): Promise<Object> {
    try{
      const user = await this.userRepository.findOne({
        where: {ID: id}
      })
      if (!user) throw new Error(`No user with ID#${id}`)

      updateUserPasswordDto.oldPassword = crypto.pbkdf2Sync(
        updateUserPasswordDto.oldPassword, 
        process.env.SECRET_KEY || "Please specify SECRET_KEY in .env file (this will be use by default).", 
        1000, 
        100, 
        "sha512"
      ).toString("hex")
      if (updateUserPasswordDto.oldPassword !== user.password) throw new Error("Old password mismatch!")
        updateUserPasswordDto.newPassword = crypto.pbkdf2Sync(
          updateUserPasswordDto.newPassword, 
        process.env.SECRET_KEY || "Please specify SECRET_KEY in .env file (this will be use by default).", 
        1000, 
        100, 
        "sha512"
      ).toString("hex")
      user.password = updateUserPasswordDto.newPassword
      await this.userRepository.save(user)
      
      return {error: false, message: `update password complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async remove(id: string): Promise<Object> {
    try{
      await this.userRepository.delete(id)

      return {error: false, message: `delete user with ID:${id} complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async auth(username: string, password: string, ip: string): Promise<Object>{
    try{
      password = crypto.pbkdf2Sync(password, process.env.SECRET_KEY || "Please specify SECRET_KEY in .env file (this will be use by default).", 1000, 100, "sha512").toString("hex")
      const user = await this.userRepository.createQueryBuilder("user")
      .select(["user.ID", "user.username", "user.name", "user.surname", "user.role", "user.email", "user.gender", "user.path2picture", "user.phone", "user.address"])
      .where("user.username = :username AND user.password = :password", {username: username, password: password})
      .andWhere("user.approve = True")
      .getOne()
      if (!user) throw new Error("username or password incorrect.")

      await this.userActionRepository.createQueryBuilder()
      .insert()
      .into(UserAction)
      .values({usersProducer: user, detail: "login", ip: ip})
      .execute()
      
      return {error: false, message: `User with id#${user.ID} login complete.`, data: user}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async findAllAction(limit: number, page: number): Promise<Object>{
    try{
      const [action, count] = await this.userActionRepository.createQueryBuilder("action")
      .select(["action.ID", "user.ID", "user.name", "user.surname", "action.createdAt", "action.detail", "action.ip"])
      .innerJoin("action.usersProducer", "user")
      .orderBy("action.createdAt", "DESC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()
      
      return {error: false, message: `get user action complete.`, data: action, allPage: Math.ceil(count/limit)}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async logout(userID: string, ip: string): Promise<Object>{
    try{
      // const user = await this.userRepository.createQueryBuilder("user")
      // .select(["user.ID", "user.username", "user.name", "user.surname", "user.role", "user.email", "user.gender", "user.path2picture", "user.phone", "user.address"])
      // .where("user.username = :username AND user.password = :password", {username: username, password: password})
      // .getOne()
      const user = await this.userRepository.findOne({where: {ID: userID}})
      if (!user) throw new Error("invalid user id.")

      await this.userActionRepository.createQueryBuilder()
      .insert()
      .into(UserAction)
      .values({usersProducer: user, detail: "logout", ip: ip})
      .execute()
      
      return {error: false, message: `User with id#${user.ID} logout complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async roleList(limit: number, page: number, role: string): Promise<Object>{
    try{
      if (!["m", "s", "t", "w", "a", "f"].includes(role)) throw new Error("Please specify users role.")

      const [users, count] = await this.userRepository.createQueryBuilder("user")
      .select(["user.ID", "user.role", "user.username", "user.name", "user.surname", "user.gender", "user.email", "user.phone"])
      .where("user.role LIKE :role", {
        role: role==="m" ? "m_________":role==="s" ? "_s________":role==="t" ? "__t_______":role==="w" ? "___w______":role==="a" ? "____a_____":role==="f" ? "_____f____":null
      })
      .andWhere("user.approve = True")
      .orderBy("user.createdAt", "ASC")
      .take(limit)
      .skip((page-1)*limit)
      .getManyAndCount()

      return {
        error: false, 
        message: `get ${role==="m" ? "manager":role==="s" ? "storage":role==="t" ? "tester":role==="w" ? "worker":null} list complete.`, 
        data: users, allPage: Math.ceil(count/limit)
      }
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async updateRole(id: string, updateUserDto: UpdateUserDto): Promise<Object>{
    try{
      const role = updateUserDto.role
      if (role === undefined || role.length > 10 || role.length < 1 || !role.match(/^(?!-+$)[a-z-]{10}$/))
        throw new Error("Invalid role format.")
      
      const user = await this.userRepository.createQueryBuilder()
      .update(UsersProducer)
      .set(updateUserDto)
      .where("ID = :id", {id})
      .execute()

      return {error: false, message: `Update role complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async approveUser(userID: string): Promise<Object>{
    try{
      await this.userRepository.createQueryBuilder()
      .update(UsersProducer)
      .set({approve: true})
      .where("ID = :userID", {userID})
      .execute()

      return {error: false, message: `Approve user complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async uploadProfile(file: Express.Multer.File, userID: string): Promise<Object>{
    try{
      if (!file) throw new Error("File not found.")
      
      const user = await this.userRepository.findOne({where: {ID: userID}})
      if (!user) throw new Error("Invalid user ID.")
      if (user.path2picture !== null){
        try{
          await promises.unlink(user.path2picture)
        }
        catch(err){
          // Error if file on server not found
        }
      }

      user.path2picture = file.path
      await this.userRepository.save(user)

      return {error: false, message: `Upload user profile image complete.`}
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  async getProfile(userID: string): Promise<StreamableFile>{
    try{
      const profilePath = await this.userRepository.createQueryBuilder("user")
      .select("path2picture")
      .where("user.ID = :userID", {userID})
      .getRawOne()

      if (!profilePath) throw new Error("Invalid user ID.")

      if (!profilePath.path2picture) throw new Error("User has no profile picture.")

      return new StreamableFile(createReadStream(join(process.cwd(), profilePath.path2picture)))
    }
    catch (err){
      this.logger.error(err.message)
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }
}
