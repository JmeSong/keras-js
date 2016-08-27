import Layer from '../../engine/Layer'
import Tensor from '../../Tensor'
import ops from 'ndarray-ops'

/**
 * ZeroPadding1D layer class
 */
export default class ZeroPadding1D extends Layer {
  /**
   * Creates a ZeroPadding1D activation layer
   * @param {number} padding - length of padding
   */
  constructor (padding = 1, attrs = {}) {
    super(attrs)
    this.padding = padding
  }

  /**
   * Method for layer computational logic
   * @param {Tensor} x
   * @returns {Tensor} x
   */
  call = x => {
    const inputShape = x.tensor.shape
    const outputShape = [inputShape[0] + this.padding * 2, inputShape[1]]
    let y = new Tensor([], outputShape)
    ops.assign(
      y.tensor.hi(inputShape[0] + this.padding, inputShape[1]).lo(this.padding, 0),
      x.tensor
    )
    x.tensor = y.tensor
    return x
  }
}
