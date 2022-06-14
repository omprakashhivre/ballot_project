
import { query } from "express";
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, ManyToOne } from "typeorm";
import { Query } from "./Query";


@Entity()
export class Vote extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    voteId:number |undefined

    @Column({type:"int",name:"queryId"})
    queryId:number |undefined

    @Column({type:"int",name:"optionId",nullable:false})
    optionId:number | undefined

    @Column({type:"int",name:"userId",nullable:false})
    userId:number | undefined

   

}