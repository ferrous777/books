package com.psion.core.coroutines

import kotlin.coroutines.CoroutineContext

/**
 * [CoroutineContext] wrapper to make testing easier
 */
interface CoroutineContextProvider {
    val ui: CoroutineContext
    val io: CoroutineContext
    val async: CoroutineContext
}