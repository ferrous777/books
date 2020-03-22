package com.psion.data

import java.io.BufferedReader
import java.io.FileReader
import io.reactivex.rxjava3.core.*;

class FileSplitter {
    fun start() {
        val reader = BufferedReader(FileReader("ol_dump_2020-02-29.txt"))
        val observable = Flowable.fromIterable()
    }
}