import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreatePlayerDto, Player, PlayerLookup, Update_Player } from '../model/player.dto';
import { UpdatePlayer } from '../Players/update-player/update-player';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private http = inject(HttpClient);
  private baseUrl = 'https://tamemwork0-001-site1.jtempurl.com';
  private apiUrl = `${this.baseUrl}/Players/create`;

  LookupPlayers(searchTerm: string) {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<PlayerLookup[]>(`${this.baseUrl}/Players/Lookup`, { params });
  }

  getPlayers(): Observable<Player[]> {
    var playerlisturl = `${this.baseUrl}/Players/GetAllPlayers`;
    return this.http.get<Player[]>(playerlisturl);
  }

  addPlayer(dto: CreatePlayerDto): Observable<any> {
    return this.http.post(this.apiUrl, dto);
  }

  FindePlayer(playerid: number) {
    return this.http.get(`${this.baseUrl}/Players/FindPlayer/${playerid}`);
  }

  // دالة تعديل اللاعب: ترسل بيانات اللاعب للسيرفر بطلب PUT
  UpdatePlayer(player: Update_Player) {
    return this.http.put(`${this.baseUrl}/Players/Updateplayer`, player, {
      responseType: 'text',
    });
  }
}
