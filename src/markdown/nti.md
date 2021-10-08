### Basic usage
<code>GET /api/ntig/{location}</code>
<br/>
<a href="/api/ntig/all" target="_blank"><button>Try it</button></a>

### Response
```
{
    error: boolean
    message: String
    response: {
        name: String
        job: String
        imageUrl: String
        location: String
        email: String
        phone: String|null
    }[] | null
}
```

### Locations
```
"all",
"borlange",
"eskilstuna",
"gardet",
"handelsgymnasiet-goteborg",
"handelsgymnasiet",
"helsingborg",
"johanneberg",
"karlstad",
"kristianstad",
"kronhus",
"lulea",
"lund",
"malmo",
"nacka",
"skovde",
"sollentuna",
"stockholm",
"sundbyberg",
"sundsvall",
"sodertalje",
"sodertorn",
"umea",
"uppsala",
"gavle",
"vetenskaphelsingborg",
"vetenskaplund",
"vetenskapsolna",
"vetenskapstockholm",
"vasteras",
"orebro"
```