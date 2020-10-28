import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("max_capacity")
export default class GaleriaDate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  event: string;

  @Column()
  max_capacity: number;
}
