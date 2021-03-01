import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css'],
})
export class PostagemDeleteComponent implements OnInit {
  postagem: Postagem = new Postagem();
  idPost: number;
  constructor(
    private rota: Router,
    private activeRota: ActivatedRoute,
    private postagemService: PostagemService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      // alert('Sua sessão expirou. Faça login novamente.')
      this.rota.navigate(['/login']);
    }

    this.idPost = this.activeRota.snapshot.params['id'];
    this.findByIdPostagem(this.idPost);
  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((r: Postagem) => {
      this.postagem = r;
    });
  }

  apagar() {
    this.postagemService.deletePostagem(this.idPost).subscribe(() => {
      alert('Postagem excluída com sucesso!');
      this.rota.navigate(['/inicio']);
    });
  }
}
