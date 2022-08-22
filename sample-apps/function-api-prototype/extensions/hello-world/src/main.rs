use serde::Serialize;

mod api;
use api::*;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let input: Input = serde_json::from_reader(std::io::BufReader::new(std::io::stdin()))?;
    let mut out = std::io::stdout();
    let mut serializer = serde_json::Serializer::new(&mut out);
    function(input)?.serialize(&mut serializer)?;
    Ok(())
}

fn function(input: Input) -> Result<FunctionResult, Box<dyn std::error::Error>> {
    let foo = input.foo;

    Ok(FunctionResult {
        operations: vec![Operation {
            print: Some(PrintOperation {
                message: format!("Hello from your function! I received foo={:?}", foo)
            }),
        }],
    })
}

// TODO: Replace this with tests!
// #[cfg(test)]
// mod tests {
//     use super::*;
//     fn default_input() -> Input {
//         Input {
//           ...
//         }
//     }

//     #[test]
//     fn test_does_the_thing() {
//         let input = default_input();
//         let operations = function(input).unwrap().operations;
//         assert_eq!(operations.len(), 1);
//     }
// }
