describe("Research Time Check Test", function() {

	describe("generateMessage", function() {
		it ("Default behaviour", function() {
			var result = {"min": 10, "max": 20};
			var message = generateMessage(result);

			expect(message).toBe("The duration will be between 10-20 mins.");
		});

		it ("Min and max are equal", function() {
			var result = {"min": 10, "max": 10};
			var message = generateMessage(result);

			expect(message).toBe("The duration will be 10 mins.");
		});
	});

	describe("getTimes", function() {
		it ("Check for number of times", function() {
			var text = "Time [10-30mins] Time [20-30 mins]";
			var result = getTimes(text);

			expect(result.length).toBe(2);
		});

		it ("Check for number of times", function() {
			var text = "Time [10mins] Time [20 mins]";
			var result = getTimes(text);

			expect(result.length).toBe(2);
		});
	});

	describe("getTimeValues", function() {
		it ("Check for number of times", function() {
			var array = ["10-30mins", "20-30 mins"];
			var result = getTimeValues(array);

			expect(result.length).toBe(2);
		});
	});

	describe("sumTimes", function() {
		it ("Check for sum of min", function() {
			var times = [{"min": 10, "max": 20}, {"min": 10, "max": 20}];
			var result = sumTimes(times);

			expect(result.min).toBe(20);
		});

		it ("Check for sum of max", function() {
			var times = [{"min": 10, "max": 20}, {"min": 10, "max": 20}];
			var result = sumTimes(times);

			expect(result.max).toBe(40);
		});
	});

	describe("parseForMinAndMax", function() {
		it ("Check for min value", function() {
			var timeText = "10-30mins";
			var result = parseForMinAndMax(timeText);

			expect(result.min).toBe(10);
		});

		it ("Check for max value", function() {
			var timeText = "10-30mins";
			var result = parseForMinAndMax(timeText);

			expect(result.max).toBe(30);
		});

		it ("Check for min value", function() {
			var timeText = "10-20 mins";
			var result = parseForMinAndMax(timeText);

			expect(result.min).toBe(10);
		});

		it ("Check for max value", function() {
			var timeText = "10-20 mins";
			var result = parseForMinAndMax(timeText);

			expect(result.max).toBe(20);
		});

		it ("Check for single value", function() {
			var timeText = "20mins";
			var result = parseForMinAndMax(timeText);

			expect(result.min).toBe(20);
			expect(result.max).toBe(20);
		});
	});
});