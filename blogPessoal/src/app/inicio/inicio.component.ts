import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagem: Postagem[];
  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  user: User = new User();
  idUser = environment.id;

  constructor(
    private rota: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    if (environment.token == '') {
      // alert('Sua sessão expirou. Faça login novamente.')
      this.rota.navigate(['/login']);
    }
    this.getAllTemas();
    this.getAllPostagens();
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((r: Tema[]) => {
      this.listaTemas = r;
    });
  }
  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((r: Tema) => {
      this.tema = r;
    });
  }

  getAllPostagens() {
    this.postagemService.getAllPostagem().subscribe((r: Postagem[]) => {
      this.listaPostagem = r;
    });
  }

  findByIdUser() {
    this.authService.getByIdUser(this.idUser).subscribe((r: User) => {
      this.user = r;
    });
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;
    this.user.id = this.idUser;
    this.postagem.usuario = this.user;
    this.postagemService
      .postPostagem(this.postagem)
      .subscribe((r: Postagem) => {
        this.postagem = r;
        alert('Postagem feita com sucesso!');
        this.postagem = new Postagem();
        this.getAllPostagens();
      });
  }
}
