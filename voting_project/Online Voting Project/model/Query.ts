
import { Timestamp } from "mongodb";
import { Entity,Column,PrimaryGeneratedColumn,BaseEntity, OneToMany } from "typeorm";
import { Option } from "./Option";

@Entity()
export class Query extends BaseEntity {

    @PrimaryGeneratedColumn("increment")
    queryId:number |undefined

    @Column({type:"varchar",name:"queryName",nullable:false})
    queryname:string | undefined

    @Column({type:"timestamp" ,name:"querystartdate",nullable:false})
    queryStartDate:Date | undefined

    @Column({type:"timestamp" ,name:"queryenddate",nullable:false,unique:true}) 
    queryenddate:Date | undefined

    @Column({type:"int" })
    userId:number | undefined

    @OneToMany(()=>Option,options => options.query)
    options : Option | undefined

}