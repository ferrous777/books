package com.psion.core.coroutines

interface Dispatcher {
    fun dispatch(func: () -> Unit)
}