making your JavaScript debuggable
================================================================================

Some samples to go with the presentation [making your JavaScript debuggable][1].

The samples are in the subdirectories; each subdirectory contains a "broken"
version of a program, and a "fixed" version of a program.  The context here is
that "broken" means "difficult to debug" and "fixed" means "easier to debug".


anon-stack-traces
--------------------------------------------------------------------------------

Often when debugging we are offered stack traces of our execution profile,
either in exception stack traces, or using the built-in v8 CPU profiler.

In this case, running the broken file under the v8 CPU profile, you see no named
functions in your own code, making it a bit of a mystery as to what code is
actually running at specific stack trace entries.

Running the fixed version, where all the functions are named, is much more
useful - you'll see a reasonable name instead of "anonymous" for all the
programs functions in the stack traces.


inlining
--------------------------------------------------------------------------------

There's a great feature in v8 called "inlining".  For functions whose source is
"small" (default 600 bytes), v8 will attempt to inline the function, as it gets
used a lot, in the functions that it's called from.  

Unfortunately, this can lead to confusing situations when profiling your code,
if you notice some interesting hot spot in a profile, but the stack looks like
it's missing entries.  It might be!  Some of those missing call stacks might not
be call stacks anymore - the functions might have been inlined!

To restore a bit of order, you can use the Node.js option `--nouse_inlining`,
which is actually one of the special v8 options you can use with Node.js.  To
see the complete list, run `node --v8-options`.

If you run a CPU profile on the broken file, you are likely to see only the `a()`
and maybe `b()` functions in the stack traces.  'c()', 'd()', 'e()', and 'f()'
are gone.

If you run a CPU profile on the fixed file, you'll see all the entries.


tagging
--------------------------------------------------------------------------------

Another great v8 feature is heap snapshots.  A heap snapshot provides a
description of all the JavaScript objects currently allocated in your program.
One of the downsides of heap snapshots is that the best way to navigate through
them is via named classes.  The problem is that, for many Node.js APIs - both
core and 3rd party, classes might be in use, but you may have no idea what
the class names are.

The program in this case is a web server that leaks `request` objects supplied
by the `http` module.  If you run the broken version, send it some requests
with the `ab` command it suggests, and the do a heap snapshot, you'll see
the leak.  If you know where to look.  Did you know `request` objects are
instances of `IncomingMessage`?

To help debug issues like this, you can add a named "tag" object to the
objects you think might be leaking.  The fixed version adds a special tag
object to the `request`, and also to the `response`.  Now if you re-run
the test by running the server, sending it some requests with `ab`, and
then generate a heap snapshot, you can easily see that you're leaking
requests and not response, by searching on the classes named `Tag`...



[1]: http://pmuellr.github.io/slides/2015/11-debuggable-javascript/index.html
