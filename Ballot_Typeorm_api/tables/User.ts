import { Entity,Column,PrimaryGeneratedColumn,BaseEntity } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    Id:number |undefined

    @Column({type:"varchar"})
    firstName:string | undefined

    @Column({type:"varchar"})
    lastName:string | undefined

    @Column({type:"varchar"}) 
    emailId:string | undefined

    @Column({type:"varchar"})
    password:string | undefined


}