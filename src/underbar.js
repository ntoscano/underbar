(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
	  return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understanding it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
	  var length = array.length;
	  if( n >=length){
		return array;
	  }else{
	  	return n === undefined ? array[length - 1] : array.slice(length - n);
	  };
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
	  if(collection.length == undefined){
		  for(var x in collection){
			iterator(collection[x], x, collection);
	  	}
	  }else{
		for(var x = 0; x < collection.length; x++){
			iterator(collection[x], x, collection);
		};
	  }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
	  var list = [];
	  for(var x in collection){
		if(test(collection[x])){
			list.push(collection[x])
		}
	  }
	  return list;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
	  /* I tried to re use _.filter, but I couldn't figure it out.
	  	This is as far as I got. 

	  var reList = [];
	  var list = _.filter(collection, test)
	  for(var x in collection){
		for(var y in list){
			if(collection[x] == list[y]){
				
			}
		}
	  }
	  */
	  var list = [];
	  for(var x in collection){
		if(test(collection[x]) == false){
			list.push(collection[x])
		}
	  }
	return list;
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
	var list = [];
	list.push(array[0]);
	for(var x = 0; x < array.length; x++){
		var n = 0;
		for(var y in list){
			if(array[x] != list[y]){
				n++;
			}
			if(n == list.length){
				list.push(array[x]);
			}
		}
	}
	return list;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
	  var list = []
	  for(var x in collection){
		list.push(iterator(collection[x]));
	  }
	  return list;
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as it's second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
	  if(accumulator != undefined){
		  var current = accumulator;
		  for(var i = 0; i < collection.length; i++){
			current = iterator(current, collection[i]);
	  	}
	  	return current;
	  }else{
		var current = collection[0];
		for(var i = 1; i < collection.length; i++){
			current = iterator(current, collection[i]);
		}
		return current;
	  };
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
	if(collection.length == undefined){
		for(var x in collection){
			if(collection[x] === target){
				return true;
			};
		};
	};
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
	  if(iterator){
		  for(var x = 0; x < collection.length; x++){
			collection[x] = iterator(collection[x]);
		  }
	  }
	  if(collection.length == 0){
		return true;
	  }else if(_.reduce(collection, function(prev, curr){
			if(prev  && curr){
				return true;
			}
	  }) == true){
		return true;
	  }else{
		return false;
	  }
    // TIP: Try re-using reduce() here.
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
	  if(collection.length == 0){
		return false;
	  }
		if(iterator){
			for(var x = 0; x < collection.length; x++){
				collection[x] = iterator(collection[x]);
			};
		}
		return _.every(collection, function(element){
			if(element){
				for(var x in collection){
					collection[x] = true;
				}
				return true;
			};
		});


    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
	  for(var x in arguments){
		for(var y in arguments[x]){
			obj[y] = arguments[x][y];
		};
	  };
	  return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
	  for(var x in arguments){
		  for(var y in arguments[x]){
			  if(obj[y] == undefined){
				  obj[y] = arguments[x][y];
			  }else{
			  }
		  };
	  };
	  return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function takes only one argument and that it is a primitive.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    var alreadyCalled = false;
    var prevArgs = [];
    var curArgs = []
    return function(args){
      var temp = [];
    for(var x = 0; x < arguments.length; x++){
      temp.push(arguments[x]);
      curArgs = temp;
    };
    if(prevArgs.toString() == curArgs.toString()){
      null;
    }else{
      var newResult = func.apply(null, arguments);
      if(alreadyCalled){
        if(result == newResult){
          alreadyCalled = true;
          return result;
        }else{
          alreadyCalled = true;
          var result = newResult;
          var temp = [];
          for(var x = 0; x < arguments.length; x++){
            temp.push(arguments[x]);
            prevArgs = temp;
          };
          return result;
          };
      }else{
        var result = newResult;
        var temp = [];
        for(var x = 0; x < arguments.length; x++){
          temp.push(arguments[x]);
          prevArgs = temp;
        }
        return result;
      };
    };
  };
  };


  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
 
  _.delay = function(func, wait) {
	  var args = [];
	  for(var x = 0; x < arguments.length; x++){
		args[x] = arguments[x];
	  }
	  args = args.slice(2);
	  setInterval(function(){
		  func.apply(null, args)
	  }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
	  var rArray = [];
	  for(var x = 0; x < array.length; x++){
		  rArray[x] = array[x];
	  }
	  for(var x = 0; x < array.length; x++){
		  var i = Math.floor(Math.random() * (x + 1));
		  var temp = rArray[x];
		  rArray[x] = rArray[i];
		  rArray[i] = temp;
	  }
	  return rArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    var returnVal = []
    function methodRunner(element, functionOrKey, args){
      var holder = "'" + element + "'." +functionOrKey + "("+ args+ ")"
      var returnVal = eval(holder);
      return returnVal;
    }
    for(var x = 0; x < collection.length; x++){
      if(typeof functionOrKey == "function"){
        returnVal[x] = functionOrKey.apply(collection[x], args)
      }else{
        returnVal[x] = methodRunner(collection[x], functionOrKey, args)
      }
    }
    return returnVal;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    /*
    var returnVal = [];
     if(typeof iterator == "function"){
      returnVal[0] = iterator(collection[0]);
       for(var x = 0; x < collection.length; x++){
         var newVal = iterator(collection[x])
         for(var y = 0; y < returnVal.length; y++){
          console.log(y)
          console.log(returnVal)
          console.log(x)
          console.log(collection.length)
           if(newVal > returnVal[y]){
             returnVal.splice(y, 0, newVal);
             break;
           }
         }
       }
     }else{
     }
     return returnVal;
     */
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var returnArray = [];
    var count = 0
    for(var x = 0; x < arguments.length; x++){
      for(var y = 0; y < arguments[x].length; y++){
        if(y > count){
          count = y;
        }
      }
    }
    for(var x = 0; x <= count; x++){
      returnArray[x] = [];
      for(var y = 0; y < arguments.length; y++){
        returnArray[x].push(arguments[y][x])
      }
    }
    return returnArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    var returnArray = [];
    function flat(nestedArray, result){
      for(var x = 0; x < nestedArray.length; x++){
        if(Array.isArray(nestedArray[x]) && !result){
          flat(nestedArray[x])
        }else{
          returnArray.push(nestedArray[x])
        }
      }
    };
    flat(nestedArray, result);
    return returnArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = [];
    var dubs = [];
    for(var x = 0; x < arguments.length; x++){
      args.push(arguments[x]);
    }
    var flat = _.flatten(args)
    for(var x = 0; x < flat.length; x++){
      var n = 0;
      for(var y = 0; y < flat.length; y++){
        if(flat[x] == flat[y])
          n++;
      }
      if(n == arguments.length){
        dubs.push(flat[x])
      }
    }
    for(var x = 0; x < dubs.length; x++){
      for(var y = 0; y < dubs.length; y++){
        if(dubs[x] == dubs[y])
          dubs.splice(y, 1)
      }
    }
    return dubs;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var dub = []
    for(var x = 0; x < array.length; x++){
      for(var y = 1; y < arguments.length; y++){
        for (var z = 0; z < arguments[y].length; z++){
          if(array[x] == arguments[y][z]){
            dub.push(arguments[y][z])
          }
        }
      }
    }
    for(var x = 0; x < array.length; x++){
      for(var y = 0; y < dub.length; y++){
        if(array[x] == dub[y]){
          array.splice(x, 1)
        }
      }
    }
    return array;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
