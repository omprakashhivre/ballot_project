
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    id:number |undefined

    @Column({type:"varchar",name:"firstname",nullable:false})
    firstname:string | undefined

    @Column({type:"varchar",name:"lastname",nullable:false})
    lastname:string | undefined

    @Column({type:"varchar",name:"email",nullable:false,unique:true}) 
    email:string | undefined

    @Column({type:"varchar",name:"password",nullable:false})
    password:string | undefined

}