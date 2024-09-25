import { Comentario } from "src/comentario/entities/comentario.entity";
import { Publicacion } from "src/publicacion/entities/publicacion.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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
    unique: true,
  })
  telefono: string;

  @Column('text', {
    select: false
  })
  contraseña: string;

  @Column('boolean', {
    default: true,
  })
  activo: boolean;

  @Column('text', {
    array: true,
    default: ['user'],
  })
  roles: string[];

  @OneToMany(
    () => Publicacion,
    publicacion => publicacion.usuario,
  )
  publicaciones: Publicacion[];

  @OneToMany(
    () => Comentario,
    comentario => comentario.usuario,
    { eager: true, nullable: true },
  )
  comentarios: Comentario[];

}
