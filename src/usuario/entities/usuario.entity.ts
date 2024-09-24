import { Comentario } from "src/comentario/entities/comentario.entity";
import { Publicacion } from "src/publicacion/entities/publicacion.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Usuario {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  nombre: string;

  @Column('text', {
    unique: true
  })
  email: string;

  @Column('text', {
    unique: true
  })
  telefono: string;

  @CreateDateColumn({ type: 'timestamp' })
  fecha_nacimiento: Date;

  @Column('text', {
    select: false
  })
  contraseña: string;

  @Column('text', {
    array: true,
    default: ['user']
  })
  roles: string[];

  @OneToMany(
    () => Publicacion,
    publicacion => publicacion.usuario,
    { eager: true }
  )
  publicaciones: string[];

  @OneToMany(
    () => Comentario,
    comentario => comentario.usuario,
    { eager: true }
  )
  comentarios: string[];

}
