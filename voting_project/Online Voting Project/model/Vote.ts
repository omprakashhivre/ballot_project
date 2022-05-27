
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity } from "typeorm";


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