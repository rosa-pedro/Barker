<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/github_username/repo_name">
    <img src="Documentation/images/logo.png" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Barker</h3>

  <p align="center">
    A social network app for you and your pets
    <br />
    <a href="https://github.com/github_username/repo_name"><strong>View Demo</strong></a>
</p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#rest-api">Rest API</a></li>
    <li><a href="#team">Team</a></li>
    <li><a href="#license">License</a></li>

  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Barker is a social network made for you and your pets, where you can post everything pet-related, from your adventures with them to finding someone to walk or take care of them while you take some me-time.
<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![.NET][.NET]][.NET-url]
* [![Angular][Angular]][Angular-url]
* [![Tailwind][Tailwind]][Tailwind-url]
* [![Docker][Docker]][Docker-url]
* [![PostgreSQL][PostgreSQL]][PostgreSQL-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

The app was built using containers with .net and angular already installed, so it's easy to get started without a lot of fuss.
### Prerequisites

The only prerequisite needed to run the app is to have [docker](https://www.docker.com/products/docker-desktop/) installed on your machine.

### Installation for windows

1. To run our application with https we first need to generate a certificate in the local machine.
    * Using Command Prompt

       ```shell
       dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\barker.pfx -p barkerpw
       dotnet dev-certs https --trust
       ```
    * Or using PowerShell

      ```shell
      dotnet dev-certs https -ep $env:USERPROFILE\.aspnet\https\barker.pfx -p barkerpw
      dotnet dev-certs https --trust
      ```
2. In the project directory build and run the containers using docker, it can take a while in the first time.
   ```sh
   docker compose up
   ```
3. Finally go to https://localhost:7049 in your browser to view the application.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

Barker has quite a few features that are listed below, where you can click them for more info, in case you are unsure how to navigate the application.

* [Login](Documentation/Usage/login.md)
* [Signup](Documentation/Usage/signup.md)
* [Filter Posts](Documentation/Usage/filter-posts.md)
* [Order Posts](Documentation/Usage/order-posts.md)
* [View Post](Documentation/Usage/view-post.md)
* [Comment Post](Documentation/Usage/comment-post.md)
* [Vote Post](Documentation/Usage/vote-post.md)
* [Create Post](Documentation/Usage/create-post.md)
* [View Profile](Documentation/Usage/view-profile.md)
* [Edit Profile](Documentation/Usage/edit-profile.md)
* [Add Pet](Documentation/Usage/add-pet.md)
* [Chat](Documentation/Usage/chat.md)


The application when started for the first time several data, like users, posts, pets, etc..., are seeded so Barker can feel more alive from the beginning.

In case you dont want to sign up, you can use one of the dummy accounts instead.

````json
{
   "UserName": "william",
   "Password": "Pa$$w0rd"
}
````

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- Rest API -->
## Rest API

Check the [documentation](Documentation/API/index.md) for all the available endpoints.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- Team -->
## Team

Hysa Mello - 201901470 - 201901470@estudantes.ips.pt

Pedro Rosa - 201900769 - 201900769@estudantes.ips.pt

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[IPS-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[IPS-url]: https://linkedin.com/in/linkedin_username
[product-screenshot]: Documentation/images/homepage.png
[.NET]: https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white
[.NET-url]: https://dotnet.microsoft.com/en-us/
[Tailwind]: https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Docker]: https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Angular]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[PostgreSQL]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
