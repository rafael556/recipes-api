import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Recipe {
  constructor(data?: Partial<Recipe>) {
    if (data) {
      Object.assign(this, data);
    }
  }

  @PrimaryColumn()
  recipeId: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  instructions: string;

  @Column()
  prepareTime: number;

  @Column()
  portionsNumber: number;

  @Column()
  difficulty: number;

  @Column()
  creationDate: string;

  @Column()
  updateDate: string;

  @Column()
  isActive: boolean;

  activate() {
    this.isActive = true;
  }

  deactivate() {
    this.isActive = false;
  }
}
