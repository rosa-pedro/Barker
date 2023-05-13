using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using API.Entities;
using API.Interfaces;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public UsersController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var users = await _unitOfWork.UserRepository.GetUsersAsync();
            return Ok(users);
        }

        // GET: api/Users/5
        [HttpGet("{id}", Name = "Get")]
        public string GetUser(int id)
        {
            return "value";
        }

        // POST: api/Users
        [HttpPost]
        public void CreateUser([FromBody] string value) { }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public void UpdateUser(int id, [FromBody] string value) { }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public void DeleteUser(int id) { }
    }
}