import {useLayoutEffect, memo, useState, useMemo, useRef} from 'react';
import { Handle, Position } from 'react-flow-renderer';

const CustomDefault = ({ isConnectable, sourcePosition, targetPosition, data, ...props }) => {
  const nodeRef = useRef();
  const [answers, setAnswers] = useState(data.answers)
  const [dimensions, setDimensions] = useState({ width: 100, height: 20 });

  useLayoutEffect(() => {
    if (nodeRef.current) {
      setDimensions({
          width: nodeRef.current.offsetWidth + dimensions.width,
          height: nodeRef.current.offsetHeight + dimensions.height
      });
    }
  }, []);

  console.log("HERE", dimensions.width)

  const positionHandle = (index) => {
    return (dimensions.width * index) / (Object.values(answers).length + 1)
    if (index === 1 || index === 2) {
        return (dimensions.width / 3) * index
    } else if (index === 3) {
        return 0
    } else if (index === 4) {
        return dimensions.width
    }
}

  const targetHandles = useMemo(
      () =>
        Object.values(answers).map((answer, i) => {
              const handleId = `target-handle-${i + 1}`;
              return (
                  <Handle
                    key={handleId}
                    type="target"
                    id={handleId}
                    style={{left: positionHandle(i + 1)}}
                  >
                    <div style={{height: 25}}>{answer.label}</div>
                  </Handle>
              );
          }),
      [answers]
  );

  return (
      <div ref={nodeRef} style={{ display: "flex", flexDirection: 'column', justifyContent: "space-around", alignItems: "center", borderRadius: 5, borderColor: 'pink', borderWidth: 2, borderStyle: 'solid', padding: 15 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 500, fontSize: 15 }}>{data.label}</div>
        </div>
        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row'}}>
          {targetHandles}
        </div>
      </div>
  );
};

export default memo(CustomDefault);