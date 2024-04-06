import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/Member.entity';
import { Repository } from 'typeorm';
@Injectable()
export class MemberService {

  
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}
  create(createMemberDto: CreateMemberDto) {
        const newUser = this.memberRepository.create({ ...createMemberDto,isActive : true });
    return this.memberRepository.save(newUser);
  }

  findAll(): Promise<Member[]> {
    return this.memberRepository.find();
  }

  findOne(id: number): Promise<Member | null> {
    return this.memberRepository.findOneBy({ id });
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return this.memberRepository.update({ id }, { ...updateMemberDto })
  }


  async remove(id: number): Promise<void> {
    await this.memberRepository.delete(id);
  }
}
