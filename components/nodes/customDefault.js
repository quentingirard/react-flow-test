import { useLayoutEffect, memo, useState, useMemo, useRef } from "react";
import { Handle, Position } from "react-flow-renderer";

const CustomDefault = ({
  isConnectable,
  sourcePosition,
  targetPosition,
  data,
  ...props
}) => {
  const {node} = data

  const nodeRef = useRef();
  const [answers, setAnswers] = useState(node.answers);
  const [dimensions, setDimensions] = useState({});

  useLayoutEffect(() => {
    if (nodeRef.current) {
      setDimensions({
        width: nodeRef.current.offsetWidth,
        height: nodeRef.current.offsetHeight,
      });
    }
  }, []);

  const positionHandle = index => {
    return (dimensions.width * ((index * Object.values(node.answers).length) + 1)) / (Object.values(node.answers).length * 2);
  };


  const targetHandles = useMemo(() => {
    if (Object.values(dimensions).length === 0) {
      return [];
    }
    
    return Object.values(node.answers).map((answer, i) => {
      const handleId = `target-handle-${i + 1}`;
      return (
      <div style={{ 
        flex: 1,
        textAlign: 'center',
        padding: 4,
        backgroundColor: '#0A2141',
        color: 'white',
        fontSize: 10,
        marginTop: 10,
        borderBottomLeftRadius: i === 0 ? 5 : 0,
        borderBottomRightRadius: i === Object.values(node.answers).length - 1 ? 5 : 0,
        alignItems: 'center',
        flexDirection: 'column',
        
      }}>
        {answer.label}
        <Handle
            key={handleId}
            type="source"
            id={handleId}
            position={Position.Bottom}
            style={{ left: positionHandle(i), bottom: -8, zIndex: -1, backgroundColor: '#C4C4C4', width: 20, height: 20, borderRadius: 20, }}
          />
        </div>)
        
          
    });
  }, [answers, dimensions]);

  return (
    <div
      ref={nodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: 5,
        boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
        backgroundColor: 'white',
      }}
    >
      <Handle
            key={node.id}
            type="target"
            id={node.id}
            position={Position.Top}
            style={{ backgroundColor: '#C4C4C4', width: 20, height: 10 }}
          />
      <div style={{ 
        backgroundColor: '#0A2141', 
        width: '100%', 
        paddingTop: 5, 
        paddingBottom: 5, 
        fontSize: 10, 
        marginLeft: 5, 
        marginRight: 5, 
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5,
        color: 'white'
        }}>
          {node.category}
      </div>

      <button onClick={() => console.log("Test")}>CC</button>

      <div style={{ fontWeight: 500, fontSize: 15, paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>{node.label.en}</div>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {targetHandles}
      </div>
    </div>
  );
};

export default memo(CustomDefault);
