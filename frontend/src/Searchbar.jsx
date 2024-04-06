import  { useState } from "react";
import {useCombobox} from 'downshift'



export default function Searchbar(props) {

    function ItemChosen( item , props) {
        console.log("Item chosen")
        props.setPoi(item.name);
    }

    function getNameFilter(inputValue) {
      const lowerCasedInputValue = inputValue.toLowerCase().replaceAll(" ", "")
  
      return function nameFilter(node) {
        return (
          !inputValue ||
          node.name.toLowerCase().replaceAll(" ", "").includes(lowerCasedInputValue)
        )
      }
    }
  
    function ComboBox() {
      const [items, setItems] = useState(props.names)
      const {
        isOpen,
        getMenuProps,
        getInputProps,
        getItemProps,
      } = useCombobox({
        onInputValueChange({inputValue}) {
          setItems(props.names.filter(getNameFilter(inputValue)))
        },
        items,
        itemToString(item) {
          return item
        },
      })
  
      function enterHandler(event) {
        if (event.key === "Enter") {
          if (items.length) {
            ItemChosen(items[0], props)
          }
        }
      }
  
      return (
        <div className="flex flex-col">
          <div className={"flex flex-row rounded-md bg-white border-black border-2 p-2 transition-[border-radius] duration-75 " + (isOpen ? "rounded-br-none" : "")}>
            <span className="material-symbols-outlined text-3xl pr-2">search</span>
            <input
            className="text-2xl bg-transparent outline-none placeholder:text-slate-600 w-32"
            type="text"
            placeholder="search"
            onKeyUp={enterHandler}
            {...getInputProps()}
            />
          </div>
  
          <ul
            className={"border-black  bg-white border-2 rounded-b-md border-t-0 pr-8 pb-2 pl-1 max-w-max self-end " + (!(isOpen && items.length) ? "hidden" : "")}
            {...getMenuProps()}
          >
            {
              items.slice(0,5).map((item, index) => (
                <li
                  className="text-2xl py-2 px-2 max-w-max cursor-pointer hover:scale-105 transition duration-150"
                  key={item.name}
                  {...getItemProps({ item, index })}
                  onClick={() => ItemChosen(item, props)}
                >
                  <span>{item.name}</span>
                </li>
              ))}
  
  
          </ul>
        </div>
      );
    }
      return <ComboBox />
    }
  