using System.Linq;
using AutoMapper;
using Domain;

namespace Application.Activities
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Activity, ActivityDto>();
            CreateMap<UserActivity, AttendeeDto>()
                .ForMember(x=>x.Username, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x=>x.DisplayName, o => o.MapFrom(s => s.AppUser.UserName))
                .ForMember(x=>x.Image, o => o.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x=>x.IsMain).Url));
        }
    }
}