import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  grammy: boolean;
}

@Entity()
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  year: number;

  @ManyToOne(() => Artist, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;
}


  
@Entity()
export class Track {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Artist, { nullable: true })
  @JoinColumn({ name: 'artistId' })
  artist: Artist | null;

  @ManyToOne(() => Album, { nullable: true })
  @JoinColumn({ name: 'albumId' })
  album: Album | null;

  @Column()
  duration: number;  // Duration in seconds
}

  
  @Entity()
  export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column()
    login: string;
  
    @Column()
    password: string;
  
    @Column({ default: 1 })
    version: number;
  
    @Column({ type: 'bigint' })
    createdAt: number;
  
    @Column({ type: 'bigint' })
    updatedAt: number;
  }
  
  @Entity()
  export class Favorites {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column('simple-array')
    artists: string[];  // Array of Artist IDs
  
    @Column('simple-array')
    albums: string[];   // Array of Album IDs
  
    @Column('simple-array')
    tracks: string[];   // Array of Track IDs
  }
  