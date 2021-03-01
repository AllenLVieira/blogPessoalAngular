import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  user: User = new User();
  idUser: number;
  confirmarSenha: string;
  tipoUsuario: string;
  constructor(
    private authService: AuthService,
    private activeRota: ActivatedRoute,
    private rota: Router
  ) {}

  ngOnInit() {
    window.scroll(0, 0);
    if (environment.token == '') {
      // alert('Sua sessão expirou. Faça login novamente.')
      this.rota.navigate(['/login']);
    }
    this.idUser = this.activeRota.snapshot.params['id'];
    this.findByIdUser(this.idUser);
  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value;
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value;
  }

  atualizar() {
    this.user.tipo = this.tipoUsuario;
    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas não estão iguais.');
    } else {
      this.authService.cadastro(this.user).subscribe((resp: User) => {
        this.user = resp;
        this.rota.navigate(['/inicio']);
        alert('Usuário atualizado com sucesso! Faça o login novamente.');
        environment.token = '';
        environment.nome = '';
        environment.foto = '';
        environment.id = 0;
        this.rota.navigate(['/login']);
      });
    }
  }

  findByIdUser(id: number) {
    this.authService.getByIdUser(id).subscribe((r: User) => {
      this.user = r;
    });
  }
}
