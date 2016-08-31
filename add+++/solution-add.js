function add(numb) {
	return function(secondNumber){
		return secondNumber+numb;
	};
}
