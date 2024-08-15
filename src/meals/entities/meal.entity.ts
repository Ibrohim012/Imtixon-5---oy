import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Restaurant } from 'src/restaurant/entities/restaurant.entity';

@Entity('meals')
export class Meal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ type: 'uuid' })
  category_id: string;

  @Column({ type: 'uuid' })
  restaurant_id: string;

  @Column({ type: 'text', nullable: true })
  imageUrl: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @ManyToOne(() => Category, category => category.meals, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Restaurant, restaurant => restaurant.meals, { eager: true })
  @JoinColumn({ name: 'restaurant_id' })
  restaurant: Restaurant;
}
