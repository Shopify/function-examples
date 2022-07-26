#include <iostream>
#include "json_struct.h"
#include "api.h"

struct DiscountConfig
{
    int quantity;
    float percentage;
    JS_OBJ(quantity, percentage);
};


FunctionResult function(Input input) {
  FunctionResult result;
  DiscountConfig discountConfig = input.config<DiscountConfig>();
  
  // calculate discounts
  if (input.cart.lines.empty()) {
    result.discountApplicationStrategy = DiscountApplicationStrategy::FIRST;
    return result;
  }

  std::vector<Target> targets;

  for (auto& line : input.cart.lines) {
    if (line.quantity > 2) {
      Target target;
      target.productVariant = ProductVariant{line.merchandise.id.value_or(""), line.quantity};
      targets.push_back(target);
    }
  }


  if (targets.empty()) {
    result.discountApplicationStrategy = DiscountApplicationStrategy::FIRST;
    return result;
  }

  result.discounts.push_back(Discount{
    Value{std::nullopt, Percentage{10.0}},
    targets,
    input.cart.attribute.value().value,
    std::nullopt
  });

  return result;
}

int main()
{
  std::string line;
  std::getline(std::cin, line);

  // parse function input
  JS::ParseContext context(line);
  Input input;
  context.parseTo(input);

  // call function
  FunctionResult result = function(input);

  // output json result
  std::string result_json = JS::serializeStruct(result, JS::SerializerOptions(JS::SerializerOptions::Compact));
  std::cout << result_json << std::endl;

  return 0;
}
