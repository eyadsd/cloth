class Utils{
	
	static map(input,input_start,input_end,output_start,output_end){
		let output = output_start + ((output_end - output_start) / (input_end - input_start)) * (input - input_start);
		return output;

	}
}