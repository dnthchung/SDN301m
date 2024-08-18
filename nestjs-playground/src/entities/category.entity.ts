import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';
// import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity(
  // "table name"
  'category',
)
export class Category extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;
}
