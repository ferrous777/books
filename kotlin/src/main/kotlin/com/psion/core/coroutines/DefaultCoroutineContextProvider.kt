package com.psion.core.coroutines

import kotlin.coroutines.CoroutineContext
import kotlinx.coroutines.Dispatchers

class DefaultCoroutineContextProvider : CoroutineContextProvider {
    override val ui: CoroutineContext
        get() = Dispatchers.Main
    override val io: CoroutineContext
        get() = Dispatchers.IO
    override val async: CoroutineContext
        get() = Dispatchers.Default
}