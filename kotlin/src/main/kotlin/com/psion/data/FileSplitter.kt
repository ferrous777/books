package com.psion.data

import org.springframework.context.annotation.Bean
import org.springframework.stereotype.Component
import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.File
import java.io.FileReader

@Component
class FileSplitter {
    private val authors: BufferedWriter = File("authors.json").bufferedWriter()
    private val books: BufferedWriter = File("books.json").bufferedWriter()
    private val editions: BufferedWriter = File("editions.json").bufferedWriter()
    private val pages: BufferedWriter = File("pages.json").bufferedWriter()
    private val subjects: BufferedWriter = File("subjects.json").bufferedWriter()
    private val works: BufferedWriter = File("works.json").bufferedWriter()

    fun execute() {
        val reader = BufferedReader(FileReader("ol_dump_2020-02-29.txt"))
        var line: String? = null
        while ({ line = reader.readLine(); line }() != null) {
            line?.let {
                val split = it.split('\t')
                val json = split[4]
                when (split[0]) {
                    "/type/author" -> authors.write(json)
                    "/type/book" -> books.write(json)
                    "/type/edition" -> editions.write(json)
                    "/type/page" -> pages.write(json)
                    "/type/subject" -> subjects.write(json)
                    "/type/work" -> works.write(json)
                }
            }
        }
        authors.close()
        books.close()
        editions.close()
        pages.close()
        subjects.close()
        works.close()
    }

    companion object {
        @Bean
        fun create(): FileSplitter = FileSplitter()
    }
}