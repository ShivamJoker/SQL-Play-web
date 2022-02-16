import { AiOutlineSearch } from "react-icons/ai";
import '@styles/Workspace/SearchBox/index.scss';
import { useContext, useEffect, useState } from "react";
import getSQLData from "@utils/getSQLData";
import sqlSyntaxes from "~types/sqlSyntaxes";
import Accordian from "./Accordian/index2";
import 'highlight.js/styles/vs.css'
import { AppContext } from "@contexts/AppContext";

const SearchBox: React.FC = () => {
  const [searchingTextList, setSearchingTextList] = useState<sqlSyntaxes[]>();
  const [sqlSyntaxData, setSqlSyntaxData] = useState<sqlSyntaxes[]>();
  const [inputText, setInputText] = useState<string>();
  const [expanded, setExpanded] = useState<Array<number>>([]);
  const {dispatch} = useContext(AppContext);
  useEffect(() => {

    const getSqlRequest = (async () => {
      const data = await getSQLData();
      setSearchingTextList(data);
      setSqlSyntaxData(data);
    })();
    return () => {
      getSqlRequest ? Promise.resolve(getSqlRequest) : null;
    }
  }, []);


  useEffect(() => {
    if(!inputText || inputText === '') {
      setSearchingTextList(sqlSyntaxData);
      return;
    };
    const filtered = sqlSyntaxData?.filter((item) => {
      const keywords = `${item.title} ${item.tag} ${item.description}`;
      const index = keywords.toLowerCase().indexOf(inputText.toLowerCase());
      return index !== -1;
    });
    setSearchingTextList(filtered)
  }, [inputText]);

  return <div className="searchbox__container">
          <div className="searchbox__container__input_box">
            <input
              type="search"
              autoComplete="off"
              placeholder="Search for commands"
              className="searchbox__container__input_box__input"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button className="search_icon">
              <AiOutlineSearch size={24} />
            </button>
          </div>
          <div className="searchbox__container__results">
            <div className="result_box">
              <Accordian items={searchingTextList ? searchingTextList : []} />
            </div>
            {/* {searchingTextList ? searchingTextList.map((item, index) => (
              <Accordian
                item={item}
                i={index}
                expanded={expanded}
                setExpanded={setExpanded}
                key={item.id}
                changeText={(text) =>
                  dispatch({ type:'update_editor_text', text })
                }
              />
            )) : null} */}
          </div>
        </div>;
}

export default SearchBox;
