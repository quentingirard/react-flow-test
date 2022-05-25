import {
  useLayoutEffect,
  memo,
  useState,
  useMemo,
  useRef,
} from "react";
import { Handle, Position } from "react-flow-renderer";

const CustomDefault = ({
  isConnectable,
  sourcePosition,
  targetPosition,
  data,
  ...props
}) => {
  const nodeRef = useRef();
  const [answers, setAnswers] = useState(data.answers);
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
    return (dimensions.width * index) / (Object.values(answers).length + 1);
  };

  const targetHandles = useMemo(
    () =>
      Object.values(answers).map((answer, i) => {
        const handleId = `target-handle-${i + 1}`;
        return (
          <Handle
            key={handleId}
            type="target"
            id={handleId}
            position={Position.Bottom}
            style={{ left: positionHandle(i + 1) }}
          >
            <div
              style={{
                marginTop: 10,
                // LOL so far the only way I've found to "center" this shit
                marginLeft: -10,
                textAlign: "center",
              }}
            >
              {answer.label}
            </div>
          </Handle>
        );
      }),
    [answers, dimensions]
  );

  return (
    <div
      ref={nodeRef}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        borderRadius: 5,
        borderColor: "pink",
        borderWidth: 2,
        borderStyle: "solid",
        padding: 15,
        minWidth: 100,
      }}
    >
      <div style={{ fontWeight: 500, fontSize: 15 }}>{data.label}</div>
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
