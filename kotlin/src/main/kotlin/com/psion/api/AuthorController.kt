package com.psion.api

import com.psion.data.FileSplitter
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

data class Author(val id: String)

@RestController
class AuthorController {

    @GetMapping("/setup")
    fun setup() = FileSplitter.create().execute()

    @GetMapping("/author")
    fun author() = Author("id")
}