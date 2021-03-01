import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css'],
})
export class PostagemEditComponent implements OnInit {
  postagem: Postagem = new Postagem();
  tema: Tema = new Tema();
  listaTemas: Tema[];
  idTema: number;
  constructor(
    private rota: Router,
    private activeRota: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      // alert('Sua sessão expirou. Faça login novamente.')
      this.rota.navigate(['/login']);
    }

    let id = this.activeRota.snapshot.params['id'];
    this.findByIdPostagem(id);
    this.findAllTemas();
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((r: Postagem) => {
      this.postagem = r;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((r: Tema) => {
      this.tema = r;
    });
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((r: Tema[]) => {
      this.listaTemas = r;
    });
  }

  atualizar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;
    this.postagemService.putPostagem(this.postagem).subscribe((r: Postagem) => {
      this.postagem = r;
      alert('Postagem atualizada');
      this.rota.navigate(['/inicio']);
    });
  }
}
